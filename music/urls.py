from django.urls import path
from . import views
from django.contrib import admin
urlpatterns = [
    path('admin/',admin.site.urls),
    path('', views.start, name='start'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('home',views.home,name='home'),
    path('show', views.show, name='show'),
    path('edit/', views.edit, name='edit'),
    path('forget_password/', views.forget_password, name='forget_password'),
    path('update/', views.update, name='update'),
    path('delete/', views.delete, name='delete'),
    path('user_logout/',views.user_logout,name='user_logout'),
    path('search_songs/', views.search_songs, name='search_songs'),
]
