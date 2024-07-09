from django.contrib import admin
from .models import Artist,Album,Music
# Register your models here.

@admin.register(Artist)
class ArtistAdmin(admin.ModelAdmin):
    list_display = ('id','artistName','created','last_updated')

@admin.register(Music)
class MusicAdmin(admin.ModelAdmin):
    list_display = ('id','album','thumbnail','song_title','song','created','last_updated')

@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ('id', 'artist', 'albumName','created', 'last_updated')