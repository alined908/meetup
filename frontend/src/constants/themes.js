const bold = {
    fontWeight: 600,
};

export const MuiTheme = {
    typography: {
      fontFamily: [
        "Lato",
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
      ].join(","),
      h1: bold,
      h2: bold,
      h3: bold,
      h4: {...bold, fontSize: "1.3rem"},
      h5: { ...bold, fontSize: "1.15rem" },
      h6: { ...bold, fontSize: ".95rem" },
      body1: { ...bold, fontSize: ".85rem" },
      body2: { ...bold, fontSize: ".75rem" },
      button: { ...bold, fontSize: ".75rem" },
    },
    palette: {
      primary : {
          main: "rgba(0,0,0,.9)"
      },
      secondary : {
          main: "rgb(220,0,0)"
      },
    },
    overrides: {
      MuiButton: {
        root: {
          padding: "6px 10px"
        },
        sizeSmall: {
          fontSize: ".65rem",
          padding: "4px 8px"
        },
      },
      MuiFab : {
          root: {
              background: "rgba(10,10,10, .95)",
              color: "white",
              '&:hover': {
                  background: "black !important"
              }
          },
          extended: {
              width: "100%"
          }
      },
      MuiAvatar: {
        root: {
          fontFamily: "Lato",
          fontSize: "1.15rem",
          marginRight: 5,
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;"
        },
        square :{
            boxShadow: "none"
        }
      },
      MuiList:{
        padding: {
            paddingTop: 0,
            paddingBottom: 0
        }
      },
      MuiListItemIcon : {
          root: {
              minWidth: 35
          }
      },
      MuiListItemText : {
        multiline: {
            marginTop: 4,
            marginBottom: 4,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
        }
      },
      MuiListItemAvatar:{
        root: {
            minWidth: 30
        }
      },
      MuiTooltip: {
        tooltip: {
          backgroundColor: "rgba(16,16,16, .8)",
          color: "white",
        },
      },
      MuiCircularProgress: {
        colorPrimary: {
          color: "black",
        }
      },
      MuiChip: {
        root: {
          padding: "3px 4px",
          fontSize: ".7rem",
          borderRadius: "4px",
          border: "1px solid #eeeeef",
          backgroundColor: "var(--background)",
          color: "black",
          margin: ".25rem",
          letterSpacing: "0.02857em",
          textTransform: "capitalize",
          boxShadow:"var(--shadow-0)"
        },
      },
      MuiFilledInput : {
          root: {
              backgroundColor: "white",
              border: "var(--border-separator)",
              '&:hover': {
                background: "var(--background)"
              },
              '&.Mui-focused':{
                background: "var(--background)"
              }
          }
      },
      MuiFormHelperText:{
        root: {
            fontWeight: 600,
            fontSize: ".7rem",
            marginDense:{
                marginTop: 0
            }
        },
        contained: {
            marginLeft: 10
        }
      },
      MuiSlider : {
          root: {
              color: "var(--background)"
          },
          thumb: {
              color: "#99c4ff",
  
          }
      },
      MuiListItem : {
          root: {
              '&$selected' : {
                  backgroundColor: "var(--light-blue)",
                  boxShadow: "var(--shadow-0)",
                  '&:hover': {
                      backgroundColor: "var(--light-blue)"
                  }
              }
          }
      },
      MuiBottomNavigation : {
          root :{
              justifyContent: "space-evenly",
              height: 50,
              position: 'fixed',
              bottom: 0,
              width: "100%"
          }
      },
      MuiBottomNavigationAction : {
          root : {
              fontFamily: "Lato",
              fontWeight: 600,
              '&$selected' : {
                  color: "var(--bright-blue)"
              },
              padding: "6px"
          },
          label : {
              '&$selected' : {
                  color: "black",
                  fontSize: ".75rem"
              }
          }
      },
      MuiGrid: {
          item: {
              height: "100%;"
          }
      },
      MuiFormControl: {
          root: {
              width: "100%"
          }
      },
      MuiSelect : {
          selectMenu: {
              display: "flex",
              alignItems: "center"
          }
      },
      MuiToolbar: {
        dense: {
            minHeight: 55
        }
      },
      MuiPopover: {
          paper: {
              minWidth: 200
          }
      }
    },
  };