# Generated by Django 3.0 on 2020-02-24 00:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meetup', '0032_auto_20200223_2359'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chatroom',
            name='room_type',
        ),
    ]