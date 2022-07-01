from .models import Recipe, Ingredient, Review, Meal, Cuisine, Course, Subscription, Diet, Profile

from django.contrib import admin
from django.urls import path
from django.shortcuts import render
from django import forms
from django.contrib import messages
from django.http import HttpResponseRedirect
from django.urls import reverse

class CsvImportForm(forms.Form):
    csv_upload = forms.FileField()

def upload_csv_helper(request, modal):
    if(modal == "Meal"):
        modal = Meal
    elif(modal == "Diet"):
        modal = Diet
    elif(modal == "Cuisine"):
        modal = Cuisine
    elif(modal == "Course"):
        modal = Course
    
    if request.method == "POST":
        csv_file = request.FILES["csv_upload"]

        if not csv_file.name.endswith(".csv"):
            messages.warnings(request, "The wrong file type was uploaded")
            return HttpResponseRedirect(request.path_info)
                
        file_data = csv_file.read().decode("utf-8")
        csv_data = file_data.split("\n")

        if modal == Course:
            for x in csv_data:
                fields = x.split(",")
                if(fields[0] != ""):
                    created = modal.objects.update_or_create(name = fields[0], image = fields[1])
        else:
            for x in csv_data:
                fields = x.split(",")
                if(fields[0] != ""):
                    created = modal.objects.update_or_create(name = fields[0])


        url = reverse("admin:index")
        return HttpResponseRedirect(url)

    form = CsvImportForm()
    data = {"form": form}
    return render(request, "admin/csv_upload.html", data)

def get_urls_helper(self, urls):
    new_urls = [path('upload-csv/', self.upload_csv),]
    return new_urls + urls
    
class MealAdmin(admin.ModelAdmin):
    list_display = ["name"]

    def get_urls(self):
        return get_urls_helper(self, super().get_urls())

    def upload_csv(self, request):
        return upload_csv_helper(request, "Meal")

class DietAdmin(admin.ModelAdmin):
    list_display = ["name"]

    def get_urls(self):
        return get_urls_helper(self, super().get_urls())

    def upload_csv(self, request):
        return upload_csv_helper(request, "Diet")

class CourseAdmin(admin.ModelAdmin):
    list_display = ["name"]

    def get_urls(self):
        return get_urls_helper(self, super().get_urls())

    def upload_csv(self, request):
        return upload_csv_helper(request, "Course")

class CuisineAdmin(admin.ModelAdmin):
    list_display = ["name"]

    def get_urls(self):
        return get_urls_helper(self, super().get_urls())

    def upload_csv(self, request):
        return upload_csv_helper(request, "Cuisine")

admin.site.register(Recipe)
admin.site.register(Ingredient)
admin.site.register(Review)
admin.site.register(Meal, MealAdmin)
admin.site.register(Diet, DietAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Cuisine, CuisineAdmin)
admin.site.register(Subscription)
admin.site.register(Profile)

# Register your models here.
