import React, { Component } from "react";
import { connect } from "react-redux";
import { getMeetups, getPreferences } from "../../actions";
import { MeetupCard, CategoryAutocomplete, MeetupForm } from "../components";
import {
  Grid,
  Grow,
  Avatar,
  CircularProgress,
  Button,
  Slider,
  BottomNavigation,
  BottomNavigationAction,
  Fab
} from "@material-ui/core";
import {Settings as SettingsIcon, Event as EventIcon, Add as AddIcon} from '@material-ui/icons'
import moment from "moment";
import PropTypes from "prop-types";
import {
  userPropType,
  preferencePropType,
  meetupPropType,
} from "../../constants/prop-types";
import { Helmet } from "react-helmet";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import "../../styles/datePicker.css"
import { DateRangePicker, isInclusivelyAfterDay } from "react-dates";
import styles from "../../styles/meetup.module.css";

const marks = [
  { value: 5 },
  { value: 10 },
  { value: 15 },
  { value: 20 },
  { value: 25 },
];

class Meetups extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedInput: null,
      startDate: moment(),
      endDate: moment().add("7", "d"),
      public: true,
      newMeetupForm: false,
      entries: [],
      preferences: [],
      clickedPreferences: [],
      radius: props.user.settings.radius,
      overflow: true,
      isMobile: window.matchMedia("(max-width: 768px)").matches,
      mobileTabIndex: 0
    };
  }

  async componentDidMount() {
    const handler = (e) => this.setState({ isMobile: e.matches });
    window.matchMedia("(max-width: 768px)").addListener(handler);
    await Promise.all([
      //this.props.getMeetups(),
      this.props.getMeetups({
        type: "public",
        startDate: this.state.startDate.format("YYYY-MM-DD"),
        endDate: this.state.endDate.format("YYYY-MM-DD"),
        categories: this.formatCategories([]),
        coords: {
          ...this.props.user.settings,
        },
      }),
      this.props.getPreferences(this.props.user.id),
    ]);
  }

  componentDidUpdate() {
    if (this.props.preferences !== this.state.preferences) {
      this.setState({
        preferences: this.props.preferences,
      });
    }
  }

  /**
   * Get public meetups or private meetups
   * @param {string} type - Public or Private
   */
  handleMeetupsType = (type) => {
    let publicBool = this.state.public;
    if (type === "public") {
      if (!publicBool) {
        publicBool = true;
      }
    } else if (type === "private") {
      if (publicBool) {
        publicBool = false;
      }
    }
    this.setState({ public: publicBool }, () =>
      this.determineGetMeetups(publicBool, this.state.entries)
    );
  };

  /**
   * Filter public/private meetups by preferences.
   * @param {number} index - Index of clicked preference
   */
  handlePreferenceClick = (index) => {
    const category = this.state.preferences[index].category;
    const clickedPreferences = [...this.state.clickedPreferences];
    let entries;
    if (!clickedPreferences[index]) {
      entries = [...this.state.entries, category];
    } else {
      entries = this.state.entries.filter(
        (entry) => JSON.stringify(entry) !== JSON.stringify(category)
      );
    }
    clickedPreferences[index] = !clickedPreferences[index];
    this.setState({ clickedPreferences, entries }, () =>
      this.determineGetMeetups(this.state.public, entries)
    );
  };

  /**
   * Filter public/private meetups by date range.
   * @param {Object} - Start date - End date
   */
  onDatesChange = ({ startDate, endDate }) => {
    if (!startDate || !endDate) return;
    if (!startDate.isValid() || !endDate.isValid()) return;
    this.setState({ startDate, endDate }, () =>
      this.determineGetMeetups(this.state.public, this.state.entries)
    );
  };

  onFocusChange = (focusedInput) => {
    const overflow = focusedInput ? false : true
    this.setState({ focusedInput, overflow });
  };

  isOutsideRange = (day) => {
    return (
      !isInclusivelyAfterDay(day, moment()) ||
      day.isAfter(moment().add("30", "d"))
    );
  };

  /**
   * Filter public/private meetups by category from autocomplete.
   * @param {Array} values - Array of categories.
   */
  onTagsChange = (event, values) => {
    var clickedPrefs = [...this.state.clickedPreferences];

    for (var i = 0; i < clickedPrefs.length; i++) {
      if (clickedPrefs[i]) {
        let pref = this.state.preferences[i];
        let category = pref.category;
        console.log(category);
        console.log(values);
        if (!values.includes(category)) {
          clickedPrefs[i] = !clickedPrefs[i];
        }
      }
    }

    for (var j = 0; j < values.length; j++) {
      let category = values[j];

      for (var z = 0; z < this.state.preferences.length; z++) {
        let preference = this.state.preferences[z];
        if (
          JSON.stringify(preference.category) === JSON.stringify(category) &&
          clickedPrefs[z] !== true
        ) {
          clickedPrefs[z] = true;
        }
      }
    }

    this.setState({ entries: values, clickedPreferences: clickedPrefs }, () =>
      this.determineGetMeetups(this.state.public, values)
    );
  };

  openFormModal = () => {
    this.setState({ newMeetupForm: !this.state.newMeetupForm });
  };

  formatCategories = (entries) => {
    var ids = [];
    for (var category in entries) {
      ids.push(entries[category].id);
    }
    let categoriesString = ids.join(",");

    return categoriesString.length > 0 ? categoriesString : null;
  };

  determineGetMeetups = (isPublic, categories) => {
    if (isPublic) {
      this.props.getMeetups({
        type: "public",
        startDate: this.state.startDate.format("YYYY-MM-DD"),
        endDate: this.state.endDate.format("YYYY-MM-DD"),
        categories: this.formatCategories(categories),
        coords: { ...this.props.user.settings, radius: this.state.radius },
      });
    } else {
      this.props.getMeetups({
        type: "private",
        startDate: this.state.startDate.format("YYYY-MM-DD"),
        endDate: this.state.endDate.format("YYYY-MM-DD"),
        categories: this.formatCategories(categories),
      });
    }
  };

  handleMobileTabChange = (e, newValue) => {
    this.setState({mobileTabIndex: newValue})
  }

  render() {
    const meetups = this.props.meetups;

    const renderPreset = () => {
      return (
        <div className={styles.preset}>
          {this.state.preferences.map((pref, index) => (
            <div
              key={pref.id}
              onClick={() => this.handlePreferenceClick(index)}
              className={`${styles.presetCategory} ${
                this.state.clickedPreferences[index] ? styles.active: ""
              }  elevate-0`}
            >
              <Avatar
                variant="square"
                src={`${process.env.REACT_APP_S3_STATIC_URL}${pref.category.api_label}.png`}
              />
              <span>{pref.category.label}</span>
            </div>
          ))}
        </div>
      );
    };

    return (
      <div className={`innerWrap  ${this.state.isMobile ? "innerWrap-mobile": ""}`}>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content="Meetups near you!" />
          <title>Meetups</title>
        </Helmet>
        <div 
          className={`innerLeft ${this.state.isMobile ? "innerLeft-mobile": ""} ${this.state.mobileTabIndex === 0 ? "innerLeft-show" : ""}`} 
          style={this.state.overflow ? {overflow: "auto"} : {overflow: "visible"}}
        >
          <div className="innerLeftHeader">
            <div>Meetups</div>
            {!this.state.isMobile &&
              <Fab
                color="primary"
                size="medium"
                onClick={this.openFormModal}
                aria-label="add-meetup"
              >
                <AddIcon/>
              </Fab>
            }
          </div>
          <div className="innerLeftHeaderBlock">
            <div className="hr">
              Settings
            </div>
            <div className="innerLeftHeaderBlockAction">
              <div className="blockActionHeader">
                Type
              </div>
              <div className="blockActionContent">
                <div className={styles.meetupTypes}>
                  <div 
                    className={`${styles.meetupType} ${this.state.public ? styles.meetupTypeActive : ""} elevate-0`} 
                    onClick={() => this.handleMeetupsType("public")} 
                    aria-label="public-meetups"
                  >
                    Public
                  </div>
                  <div 
                    className={`${styles.meetupType} ${this.state.public ? "" : styles.meetupTypeActive} elevate-0`} 
                    onClick={() => this.handleMeetupsType("private")} 
                    aria-label="private-meetups"
                  >
                    Private
                  </div>
                </div>
              </div>
            </div> 
            <div className="innerLeftHeaderBlockAction">
              <div className="blockActionHeader">
                Dates
              </div>
              <div className={`blockActionContent ${styles.calendar}`}>
                <DateRangePicker
                  onDatesChange={this.onDatesChange}
                  onFocusChange={this.onFocusChange}
                  focusedInput={this.state.focusedInput}
                  startDate={this.state.startDate}
                  startDateId="unique_start_date_id"
                  endDate={this.state.endDate}
                  endDateId="unique_end_date_id"
                  keepOpenOnDateSelect
                  hideKeyboardShortcutsPanel
                  minimumNights={0}
                  daySize={45}
                  numberOfMonths={this.state.isMobile ? 1 : 2}
                  isOutsideRange={
                    this.state.public ? this.isOutsideRange : () => false
                  }
                  noBorder  
                  displayFormat="MMM DD"
                  small
                />
              </div>
            </div>   
            <div className="innerLeftHeaderBlockAction">
              <div className="blockActionHeader">
                Radius
              </div>
              <div className="blockActionContent">
                  <Slider
                    disabled={!this.state.public}
                    valueLabelDisplay="off"
                    step={5}
                    marks={marks}
                    value={this.state.radius}
                    min={5}
                    max={25}
                    onChange={(e, val) => this.setState({radius: val})}
                    onChangeCommitted={(e, val) => this.determineGetMeetups(this.state.public, this.state.entries)}
                  />
                <div className="blockActionChip" style={{marginLeft: '10px'}}>
                    {this.state.public ? 
                      <>
                        {`${this.state.radius} miles`}
                      </>
                      : 
                      <>X miles</>
                    }
                </div>
              </div>
            </div>
            
            <div className="innerLeftHeaderBlockAction" style={{marginBottom: 0}}>
              <div className="blockActionHeader">
                Categories
              </div>
              <div className="blockActionContent">
                <div className={`${styles.meetupsSearchBar} elevate-0`}>
                  <CategoryAutocomplete
                    fullWidth={true}
                    size="small"
                    entries={this.state.entries}
                    handleClick={this.onTagsChange}
                    label="Search Categories..."
                  />
                </div>
              </div>
            </div>
            <div className="hr">
              Preferences
            </div>
            <div className={styles.preferences}>
                {renderPreset()}
            </div>
          </div>  
        </div>
        <div className={`innerRight ${this.state.isMobile ? "innerRight-mobile": ""} ${this.state.mobileTabIndex === 0 ? "" : "innerRight-show"}`}>
          <div className="innerRightBlock">
            <div className="innerRightBlockHeader">
              <div className="hr">
                Meetups Near You
              </div>
            </div>
            <div
              className={styles.meetupsContainer}
              style={{
                minHeight: this.props.isMeetupsFetching
                  ? "calc(100% - 60px)"
                  : "0",
              }}
            >
              {this.props.isMeetupsFetching && (
                <div className="loading" style={{ height: "auto" }}>
                  <CircularProgress size={30}/>
                </div>
              )}
              {!this.props.isMeetupsFetching && this.props.isMeetupsInitialized && (
                <Grid container justify="space-evenly" spacing={3}>
                  {meetups.map((meetup, i) => (
                    <Grow in={true} timeout={Math.max((i + 1) * 50, 500)}>
                      <div className={styles.meetupCardWrapper}>
                        <MeetupCard key={meetup.id} meetup={meetup} />
                      </div>
                    </Grow>
                  ))}
                </Grid>
              )}
            </div>
          </div>
        </div>
        <MeetupForm
          type="create"
          handleClose={this.openFormModal}
          open={this.state.newMeetupForm}
          isMobile={this.state.isMobile}
        />
        {this.state.isMobile && 
          <div className="innerWrap-mobileControl">
            <BottomNavigation value={this.state.mobileTabIndex} onChange={this.handleMobileTabChange} showLabels>
              <BottomNavigationAction label="Settings" icon={<SettingsIcon/>}/>
              <Fab
                className="mobileControl-Fab"
                color="primary"
                size="medium"
                onClick={this.openFormModal}
              >
                  <AddIcon/>
              </Fab>
              <BottomNavigationAction label="Meetups" icon={<EventIcon/>}/>
            </BottomNavigation>
          </div>
        }
      </div>
    );
  }
}

Meetups.propTypes = {
  isMeetupsInitialized: PropTypes.bool.isRequired,
  meetups: PropTypes.arrayOf(meetupPropType).isRequired,
  user: userPropType,
  preferences: PropTypes.arrayOf(preferencePropType).isRequired,
  getMeetups: PropTypes.func.isRequired,
  getPreferences: PropTypes.func.isRequired,
  isMeetupsFetching: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user.user,
    meetups: Object.values(state.meetup.meetups),
    preferences: state.user.preferences,
    isMeetupsInitialized: state.meetup.isMeetupsInitialized,
    isMeetupsFetching: state.meetup.isMeetupsFetching,
  };
}

const mapDispatchToProps = {
  getMeetups,
  getPreferences,
};

export default connect(mapStateToProps, mapDispatchToProps)(Meetups);
export { Meetups as UnderlyingMeetups };
