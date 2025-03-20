from django.db import models

class Summarization_History(models.Model):
    text_input = models.TextField()
    summary_output = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.date_created} - {self.text_input[:50]}..."
