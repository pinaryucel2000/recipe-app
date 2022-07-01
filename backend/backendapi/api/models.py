from django.db import models
from django.contrib.auth.models import User
from django.db.models.base import Model

class Profile(models.Model):
   userID = models.OneToOneField( User, on_delete=models.CASCADE, primary_key=True)
   email = models.CharField(max_length=100, blank=True, null=True)
   
# Filters
class Meal(models.Model):
    name = models.CharField(max_length=100, blank=False, null= False, primary_key=True)

class Diet(models.Model):
    name = models.CharField(max_length=100, blank=False, null= False, primary_key=True)

class Course(models.Model):
    name = models.CharField(max_length=100, blank=False, null= False, primary_key=True)
    image = models.CharField(max_length=500, blank=False, null=False)

# Recipe property
class Cuisine(models.Model):
    name = models.CharField(max_length=100, blank=False, null= False, primary_key=True)

class Recipe(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    label = models.CharField(max_length=500, blank=False)
    imageURL = models.CharField(max_length=500, blank=False)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, blank=False, null=False)
    cuisine = models.ForeignKey(Cuisine, on_delete=models.CASCADE, blank=False, null=False)
    totalTime = models.CharField(max_length=10, blank=False)
    servings = models.CharField(max_length=10, blank=False)
    calories = models.CharField(max_length=10, blank=False)
    mealType = models.ForeignKey(Meal, on_delete=models.CASCADE, blank=False, null=False)
    diet = models.ForeignKey(Diet, on_delete=models.CASCADE, blank=False, null=False)


class Ingredient(models.Model):    
    recipe = models.ForeignKey(Recipe, on_delete=models.CASCADE, blank=True, null=True)
    text = models.CharField(max_length=500, blank=False)
    weight = models.CharField(max_length=10, blank=False)

class Review(models.Model):    
    userID_recipeID = models.CharField(max_length=100, blank=False, null= False, primary_key=True)
    authorUsername = models.CharField(max_length=50, blank=False)
    recipe = models.CharField(max_length=500, blank=False)
    rating = models.IntegerField(choices=[(1,1),(2,2),(3,3),(4,4),(5,5)])
    comment = models.CharField(max_length=1000, blank=False)
    timeStamp = models.CharField(max_length=1000, blank=False)


class Subscription(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, blank=False, null=False)
    recipeID = models.CharField(max_length=500, blank=False, null=False)
    class Meta:
        unique_together = [("user", "recipeID")]

