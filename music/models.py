from django.db import models
from django.utils.translation import gettext_lazy as _
# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    age = models.IntegerField(default=18)
    country = models.CharField(max_length=100)
    zip = models.CharField(max_length=100)
    class Meta:
        db_table ='nilouser'

class Artist(models.Model):
    artistName = models.CharField(_("Artist Name"),max_length=53)
    created = models.DateTimeField(_('Artist Created Date'),auto_now_add=True)
    last_updated = models.DateTimeField(_('Last artist update'),auto_now=True)

    class Meta:
        verbose_name = _('Artist')
        verbose_name_plural = _('Artists')

    def __str__(self):
        return self.artistName

class Album(models.Model):
    artist = models.ForeignKey("Artist",verbose_name = _('Artist Album'),on_delete=models.CASCADE)
    albumName = models.CharField(_("Album Name"),max_length=50)
    created = models.DateTimeField(_('Album Created Date'), auto_now_add=True)
    last_updated = models.DateTimeField(_('Last album update'), auto_now=True)

    class Meta:
        verbose_name = _('Album')
        verbose_name_plural = _('Albums')

    def __str__(self):
        return self.albumName

class Music(models.Model):
    album = models.ForeignKey('Album',verbose_name = _('MusicModel Album'),on_delete=models.CASCADE)
    thumbnail = models.ImageField(_("Thumbnail"), upload_to='img/')
    song_title = models.CharField(_("Song Title"), max_length=255)
    song = models.FileField(_("Song"), upload_to='songs/', help_text="Any audio format supported")
    created = models.DateTimeField(_('Song Created Date'), auto_now_add=True)
    last_updated = models.DateTimeField(_('Last Song update'), auto_now=True)

    class Meta:
        verbose_name = _('Music')
        verbose_name_plural = _('Musics')

    def __str__(self):
        return self.song_title