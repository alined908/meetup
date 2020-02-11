# Generated by Django 3.0 on 2020-02-08 00:55

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('meetup', '0017_auto_20200204_2250'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='MeetupEvent',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chosen', models.IntegerField(blank=True)),
                ('location', models.TextField()),
                ('start', models.DateTimeField(blank=True, null=True)),
                ('end', models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='MeetupEventOption',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('option', models.TextField()),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='options', to='meetup.MeetupEvent')),
            ],
        ),
        migrations.RemoveField(
            model_name='meetup',
            name='chosen',
        ),
        migrations.RemoveField(
            model_name='meetup',
            name='location',
        ),
        migrations.RemoveField(
            model_name='meetup',
            name='options',
        ),
        migrations.AddField(
            model_name='meetupmember',
            name='admin',
            field=models.BooleanField(default=False),
        ),
        migrations.CreateModel(
            name='MeetupEventOptionVote',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.IntegerField(choices=[(1, 'Like'), (2, 'Ban')])),
                ('option', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='event_votes', to='meetup.MeetupEventOption')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_votes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='meetupevent',
            name='meetup',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='events', to='meetup.Meetup'),
        ),
        migrations.CreateModel(
            name='MeetupCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='meetup_events', to='meetup.Category')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='categories', to='meetup.MeetupEvent')),
            ],
        ),
    ]
