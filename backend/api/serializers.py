from rest_framework import serializers
from .models import Summarization_History

class Summarization_History_Serializer(serializers.ModelSerializer):
    class Meta :
        model = Summarization_History
        fields = ['id', 'text_input', 'summary_output', 'date_created']