from transformers import pipeline
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Summarization_History
from .serializers import Summarization_History_Serializer
from django.views.decorators.csrf import csrf_exempt
import traceback

try:
    # Load the BART model for summarization from the Hugging Face Transformers library
# This model is a large version of BART that has been fine-tuned for summarization tasks
    # summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    
    # alternate model
    summarizer = pipeline("summarization", model="allenai/led-base-16384")
    model_loaded = True
except Exception as e:
    print(f"Error loading model: {e}")
    model_loaded = False
    summarizer = None

@csrf_exempt
@api_view(["POST"])
def summarize_text(request):
    try:
        input_text = request.data.get("text", "")
        summary_size = request.data.get("size", "medium")
        
        if not input_text:
            return Response({"error": "No text provided"}, status=400)
        
        if not model_loaded:
            return Response({"error": "Summarization model failed to load"}, status=500)

        size_options = {
            "small": {"max_new_tokens": 50, "min_new_tokens": 30},
            "medium": {"max_new_tokens": 150, "min_new_tokens": 50},    
            "large": {"max_new_tokens": 250, "min_new_tokens": 100}
        }
        size_parameters = size_options.get(summary_size.lower(), size_options["medium"])

        summary_output = summarizer(input_text, **size_parameters, do_sample=False)
        summary_text = summary_output[0]["summary_text"]
        
        history_record = Summarization_History.objects.create(
            text_input=input_text,  
            summary_output=summary_text
        )
        serializer = Summarization_History_Serializer(history_record)
        
        return Response({
            "summary": summary_text,
            "size": summary_size,
            "history": serializer.data["date_created"]
        })
    
    except Exception as e:
        print(f"Error in summarize_text: {str(e)}")
        print(traceback.format_exc())
        return Response({"error": f"An error occurred: {str(e)}"}, status=500)
    
    
    '''
    from transformers import pipeline

summarizer = pipeline("summarization", model="Falconsai/text_summarization")
this is another good model from huggingface 
    
    '''