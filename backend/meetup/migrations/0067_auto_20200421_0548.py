# Generated by Django 3.0 on 2020-04-21 12:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('meetup', '0066_auto_20200421_0518'),
    ]

    operations = [
        migrations.RenameField(
            model_name='restaurantcategory',
            old_name='restauraunt',
            new_name='restaurant',
        ),
    ]