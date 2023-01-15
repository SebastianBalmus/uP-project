from django.urls import include, path
from rest_framework import routers
from VoiceVault import views

router = routers.DefaultRouter()
router.register(r'phrases', views.PhraseViewSet)
router.register(r'sessions', views.SessionViewSet)
router.register(r'audios', views.AudioViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('join-session/', views.JoinSession.as_view()),
    path('select-sex/', views.SelectSex.as_view()),
    path('record-audio/', views.RecordAudio.as_view()),
]
