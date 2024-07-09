# Generated by Django 5.0.6 on 2024-07-03 05:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('music', '0002_artist_album_music'),
    ]

    operations = [
        migrations.AlterField(
            model_name='music',
            name='song',
            field=models.FileField(help_text='Any audio format supported', upload_to='songs/', verbose_name='Song'),
        ),
        migrations.AlterField(
            model_name='music',
            name='thumbnail',
            field=models.ImageField(upload_to='img/', verbose_name='Thumbnail'),
        ),
    ]
