# Generated by Django 3.0 on 2020-02-09 22:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meetup', '0020_meetupevent_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meetupevent',
            name='chosen',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
