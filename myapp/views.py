from django.shortcuts import render

def stream_view(request):
    return render(request, 'stream.html')
