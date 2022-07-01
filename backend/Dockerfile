FROM python:3.8-alpine
ENV PYTHONUNBUFFERED 1
WORKDIR /backend
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
RUN pip install gunicorn
COPY . .
EXPOSE 8000
CMD ["python3", "./backendapi/manage.py", "runserver", "0.0.0.0:8000"]
