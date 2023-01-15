from rest_framework.generics import get_object_or_404
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from VoiceVault.models import Phrase, Session, Audio
from VoiceVault.serializers import (
    PhraseSerializer,
    SessionSerializer,
    AudioSerializer,
    JoinSessionSerializer,
    SelectGenderSerializer,
    GetPhraseSerializer,
)
from rest_framework.response import Response
from django.utils import timezone


class JoinSession(APIView):
    def get(self, request, *args, **kwargs):
        serializer = JoinSessionSerializer(data=request.query_params)
        serializer_context = {
            'request': request,
        }

        if serializer.is_valid():
            session = get_object_or_404(Session, code=serializer.validated_data['sessionCode'])

            if session.expiration <= timezone.now():
                return Response({
                    'Error': 'Sorry, this session is expired'
                }, status=404)

            session_serializer = SessionSerializer(session, context=serializer_context, many=False)
            return Response(session_serializer.data, status=200)
        return Response(serializer.errors, status=500)


class SelectSex(APIView):
    def post(self, request, *args, **kwargs):
        request_body_serializer = SelectGenderSerializer(data=request.data)
        serializer_context = {
            'request': request,
        }

        if request_body_serializer.is_valid():
            audios = Audio.objects.filter(session__code=request_body_serializer.validated_data['sessionCode'])
            audios.update(sex=request_body_serializer.validated_data['sex'])
            return Response('done', status=200)
        return Response(request_body_serializer.errors, status=500)

class RecordAudio(APIView):

    def get(self, request, *args, **kwargs):
        request_body_serializer = GetPhraseSerializer(data=request.query_params)
        serializer_context = {
            'request': request,
        }

        if request_body_serializer.is_valid():
            # phrase = Phrase.objects.get(audio__id=request_body_serializer.validated_data['audioId'])
            phrase = get_object_or_404(Phrase, audio__id=request_body_serializer.validated_data['audioId'])
            phrase_serializer = PhraseSerializer(phrase, context=serializer_context, many=False)
            return Response(phrase_serializer.data, 200)
        return Response(request_body_serializer.errors)

class PhraseViewSet(ModelViewSet):
    queryset = Phrase.objects.all()
    serializer_class = PhraseSerializer


class SessionViewSet(ModelViewSet):
    queryset = Session.objects.all()
    serializer_class = SessionSerializer


class AudioViewSet(ModelViewSet):
    queryset = Audio.objects.all()
    serializer_class = AudioSerializer

