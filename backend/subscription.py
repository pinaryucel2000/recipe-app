import smtplib
import requests
import time

EMAIL_ADDRESS =  # email
EMAIL_PASSWORD =  # password
TIME_INTERVAL = 90  # in seconds

# Server
# DJANGO_SERVER = "http://10.2.2.104:8000"
DJANGO_SERVER = "http://localhost:8000"

# Edamam API
APP_ID = "5c2a12b2"
APP_KEY = "0303b28b270df87f292d2497cdb60396"


with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
    smtp.ehlo()
    smtp.starttls()
    smtp.ehlo()

    smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)

    starttime = time.time()
    while True:
        time.sleep(TIME_INTERVAL - ((time.time() - starttime) % TIME_INTERVAL))
        end_of_period = time.time()

        response = requests.get(
            DJANGO_SERVER + "/api/subscribedRecipes/").json()

        for obj in response:
            rid = obj["recipeID"]

            emails = requests.get(
                DJANGO_SERVER + "/api/subscriptionEmails?rid=" + rid).json()
            reviews = requests.get(DJANGO_SERVER + "/api/reviews?rid=" +
                                   rid + "&time=" + str(int(end_of_period) - TIME_INTERVAL)).json()

            body = ""
            for review in reviews:
                body = body + "Author: " + review["authorUsername"] + "\n"
                body = body + "Rating: " + str(review["rating"]) + "/5\n"
                body = body + "Comment: " + review["comment"] + "\n\n"

            recipeName = ""
            if rid[0] == "r":
                recipeName = requests.get("https://api.edamam.com/api/recipes/v2/" + rid + "?app_id=" +
                                          APP_ID + "&app_key=" + APP_KEY + "&type=public").json()["recipe"]["label"]
            else:
                recipeName = requests.get(
                    DJANGO_SERVER + "/api/recipes/" + rid).json()["label"]

            subject = "Notification from Recipe: " + recipeName
            msg = f'Subject: {subject}\n\n{body}'

            for email in emails:
                email = email["email"]
                smtp.sendmail(EMAIL_ADDRESS, email, msg)
