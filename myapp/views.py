from django.shortcuts import render

def stream_view(request):
    return render(request, 'stream.html')

def plan_view(request):
    return render(request, 'aiplanner.html')