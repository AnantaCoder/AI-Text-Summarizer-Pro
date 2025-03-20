from transformers import pipeline
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Summarization_History
from .serializers import Summarization_History_Serializer



# Load the BART model for summarization from the Hugging Face Transformers library
# This model is a large version of BART that has been fine-tuned for summarization tasks
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

@api_view(["POST"])
def summarize_text(request):
    input_text = request.data.get("text", "")
    summary_size = request.data.get("size","medium")
    if not input_text:
        return Response({"error": "No text provided"}, status=400)


    size_options = {
        "small": {"max_new_tokens": 50, "min_new_tokens": 30},
        "medium": {"max_new_tokens": 150, "min_new_tokens": 50},    
        "large":{"max_new_tokens": 250, "min_new_tokens": 100}
    }
    size_parameters = size_options.get(summary_size.lower(),size_options["medium"])

    try:
        summary_output = summarizer(input_text,**size_parameters,do_sample=False)
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
        return Response({"error": str(e)}, status=500)
