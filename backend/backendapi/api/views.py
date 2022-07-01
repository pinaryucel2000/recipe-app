from sys import path_importer_cache
from django.contrib.auth.models import User
from .serializers import UserSerializer, RecipeSerializer, IngredientSerializer, ReviewSerializer, CourseSerializer, DietSerializer, MealSerializer, CuisineSerializer, SubscriptionSerializer, ProfileSerializer, SubscribedRecipesSerializer, SubscriptionEmailSerializer
from .models import Ingredient, Recipe, Review, Course, Diet, Meal, Cuisine, Subscription, Profile
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import viewsets

class SubscribedRecipesViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all().values("recipeID").distinct()
    serializer_class = SubscribedRecipesSerializer

class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id})

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
class CuisineViewSet(viewsets.ModelViewSet):
    queryset = Cuisine.objects.all()
    serializer_class = CuisineSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class DietViewSet(viewsets.ModelViewSet):
    queryset = Diet.objects.all()
    serializer_class = DietSerializer

class MealViewSet(viewsets.ModelViewSet):
    queryset = Meal.objects.all()
    serializer_class = MealSerializer

class RecipeViewSet(viewsets.ModelViewSet):
    serializer_class = RecipeSerializer

    def get_queryset(self, dietType="", mealType_="", dishType="", q="", author_="", page="", pageSize=""):
        if self.request.method == 'GET':
            dietType = self.request.GET.get('diet', "")  
            mealType_ = self.request.GET.get('mealType', "")  
            dishType = self.request.GET.get('dishType', "")  
            q = self.request.GET.get("q", "")
            author_ = self.request.GET.get("author", "")
            page =  int(self.request.GET.get("page", -1)) - 1
            pageSize = int(self.request.GET.get("pageSize", -1))

            queryset = Recipe.objects.all()
           
            if dietType != "":
                queryset = queryset.filter(diet = dietType)

            if mealType_ != "":
                queryset = queryset.filter(mealType = mealType_)    

            if dishType != "":
                queryset = queryset.filter(course = dishType)  
           
            if q != "":
                queryset = queryset.filter(label__contains = q)  

            if author_ != "":
                queryset = queryset.filter(author = author_)  

            if page < 0 or pageSize < 0:
                return queryset


            return queryset.order_by("id")[page * pageSize:page * pageSize + pageSize]
        else: 
            return Recipe.objects.all()
            

class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer

class IngredientsViewSet(viewsets.ModelViewSet):
    serializer_class = IngredientSerializer

    def get_queryset(self, rid=None):
        if self.request.method == 'GET':
            rid = self.request.GET.get('rid', None)  
           
            if rid == None:
                queryset = Ingredient.objects.all()
                return queryset           
           
            queryset = Ingredient.objects.filter(recipe=rid)
            return queryset

class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        if self.request.method == 'GET':
            return Profile.objects.all()
        elif self.request.method == "PATCH":
            return Profile.objects.all()
        elif self.request.method == "DELETE":
            return Profile.objects.all()

class ReviewsViewSet( viewsets.ModelViewSet):
    serializer_class = ReviewSerializer

    def get_queryset(self, rid=None, time=None):
        queryset = Review.objects.all()
        
        if self.request.method == 'GET':
            rid = self.request.GET.get('rid', None)  
            time = self.request.GET.get('time', None)  
           
            if rid != None:
                queryset = queryset.filter(recipe=rid)    

            if time != None:
                queryset = queryset.filter(timeStamp__gte = time)
            
            return queryset
        elif self.request.method == "PATCH":
            return Review.objects.all()
        elif self.request.method == "DELETE":
            return Review.objects.all()

class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

    def get_queryset(self, rid=None, uid=None):
        if self.request.method == 'GET':
            rid = self.request.GET.get('rid', "")  
            uid = self.request.GET.get('uid', "")

            queryset = Subscription.objects.all()
           
            if rid != "":
                queryset = queryset.filter(recipeID=rid)

            if uid != "":
                queryset = queryset.filter(user=uid)
                
            return queryset
        
        elif self.request.method == "PATCH":
            return Subscription.objects.all()
        elif self.request.method == "DELETE":
            return Subscription.objects.all()

class SubscriptionEmailsViewSet(viewsets.ModelViewSet):
    serializer_class = SubscriptionEmailSerializer

    def get_queryset(self, rid=None):
        if self.request.method == 'GET':
            subscriptions = Subscription.objects.all()
            rid = self.request.GET.get('rid', "")  
                       
            if rid != "":
                subscriptions = subscriptions.filter(recipeID=rid)

            subscriptions = subscriptions.values("user").distinct()
            ids = []

            for obj in subscriptions:
                ids.append(obj["user"])
           
            return Profile.objects.filter(userID__in = ids)
        

        