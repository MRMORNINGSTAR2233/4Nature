from django.urls import path
from .views import stream_view, plan_view

urlpatterns = [
    path('stream/', stream_view, name='stream_view'),
    path('plan/', plan_view, name='plan_view'),
]
