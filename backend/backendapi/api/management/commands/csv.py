from django.core.management.base import BaseCommand, CommandError
import os.path
from api.models import Meal, Cuisine, Course, Diet


MODELS = ["Meal", "Diet", "Cuisine", "Course"]

class Command(BaseCommand):
    help = "This command is used for uploading CSV files."
    def add_arguments(self, parser):
        parser.add_argument("modal", type=str, help="Name of the modal that you want to add data to.")
        parser.add_argument("file", type=str, help="Name of the csv file.")


    def handle(self, *args, **options):
        print(f'Modal: {options["modal"]}')
        print(f'File: {options["file"]}')

        if options["modal"] in MODELS:
            self.stdout.write(self.style.SUCCESS("Updating " + options["modal"] + " ..." ))
        else:
            raise CommandError("The value of modal can only be Meal, Diet, Cuisine or Course")

        file_name = options["file"]
        
        if not file_name.endswith(".csv"):
            raise CommandError("Wrong file extension")
         
        try:
            csv_file = open(os.path.dirname(__file__) + '/../../../../csv_files/' + options["file"])
        except OSError:
            raise CommandError("File not found")

        modal = options["modal"]
        if(modal == "Meal"):
            modal = Meal
        elif(modal == "Diet"):
            modal = Diet
        elif(modal == "Cuisine"):
            modal = Cuisine
        elif(modal == "Course"):
            modal = Course

        file_data = csv_file.read()
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
