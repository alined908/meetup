# Generated by Django 3.0 on 2020-01-01 04:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('meetup', '0008_friendship_creator'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatroommember',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='rooms', to=settings.AUTH_USER_MODEL),
        ),
    ]