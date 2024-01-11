from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Note
from .serializers import NoteSerializers
# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)


@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all().order_by('-updated') # this will order from the newest updated to the least update
    # convert data to JSON using serializers (create a new file)
    serializer = NoteSerializers(notes, many=True) # serializer by itself will be an object
    return Response(serializer.data)

@api_view(['GET'])
def getNote(request, pk):
    notes = Note.objects.get(id=pk)
    serializer = NoteSerializers(notes, many=False)# many=False means it will return one value (1 object)
    return Response(serializer.data)

@api_view(['POST'])
def createNote(request):
    data = request.data # this will have json data
    note = Note.objects.create(
        body=data['body']
    )
    serializer= NoteSerializers(note, many =False)
    return Response(serializer.data)

# update note
@api_view(['PUT'])
def updateNote(request, pk):
    # we will send the data within body
    data = request.data # it will return JSON data
    note = Note.objects.get(id = pk)
    serializer = NoteSerializers(instance=note, data = data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted!')