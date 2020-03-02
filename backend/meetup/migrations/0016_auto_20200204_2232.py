# Generated by Django 3.0 on 2020-02-04 22:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import meetup.models


class Migration(migrations.Migration):

    dependencies = [
        ('meetup', '0015_meetupinvite_uri'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meetupinvite',
            name='receiver',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_meetupinvite', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='meetupinvite',
            name='sender',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_meetupinvite', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='FriendInvite',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('status', models.IntegerField(choices=[(1, 'Open'), (2, 'Accepted'), (3, 'Rejected')], default=1)),
                ('uri', models.URLField(default=meetup.models.generate_unique_uri)),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_friendinvite', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_friendinvite', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]