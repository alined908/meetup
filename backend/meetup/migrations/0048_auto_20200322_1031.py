# Generated by Django 3.0 on 2020-03-22 10:31

from django.db import migrations, models
import meetup.helpers


class Migration(migrations.Migration):

    dependencies = [
        ('meetup', '0047_preference_ranking'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=meetup.helpers.PathAndRename('category')),
        ),
        migrations.AddField(
            model_name='meetup',
            name='public',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
    ]
