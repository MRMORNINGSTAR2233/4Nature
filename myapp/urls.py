from django.urls import path
from .views import stream_view, plan_view, home

urlpatterns = [
    path('', home, name='hme'),
    path('stream/', stream_view, name='stream_view'),
    path('plan/', plan_view, name='plan_view'),
    path('plan/', plan_view, name='business'),
]
