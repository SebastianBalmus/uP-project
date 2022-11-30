# Generated by Django 4.1.3 on 2022-11-26 22:14

import VoiceVault.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Phrase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Session',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('code', models.CharField(max_length=10)),
                ('expiration', models.DateTimeField()),
                ('numberOfPhrases', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Audio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sex', models.CharField(blank=True, choices=[('m', 'Male'), ('f', 'Female')], max_length=6, null=True)),
                ('file', models.FileField(blank=True, null=True, upload_to=VoiceVault.models.audio_file_organisation_path)),
                ('phrase', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='VoiceVault.phrase')),
                ('session', models.ForeignKey(default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='VoiceVault.session')),
            ],
        ),
    ]
