from workshopapp import app
from flask import render_template, g, url_for, request, jsonify, flash, \
    session, Response, redirect, send_from_directory,json


@app.route('/')
def index():
    title_desc = "Entaglement days of biopolymers 2021"
    return render_template('index.html', title='Entaglement days of biopolymers', title_desc=title_desc)


@app.errorhandler(404)
def page_not_found(error):

    app.logger.warning('Page not found (IP: '+request.remote_addr+') '+request.url)
    return (render_template('page_not_found.html',code="404"), 404)


@app.errorhandler(500)
def page_error(error):
    app.logger.warning('Page 500 (IP: '+request.remote_addr+') '+request.url)
    return (render_template('page_not_found.html',code="500"), 500)


@app.route('/contact')
def index_contact():
    return render_template('contact.html')

@app.route('/learn_more')
def help_learn_more():
    return render_template('learn_more.html')

@app.route('/introduction')
def help_description():
    return render_template('introduction.html')

@app.route('/cite')
def index_cite():
    return render_template('citation.html')

@app.route('/program')
def program_page():
    return render_template('contact.html')

@app.route('/speakers')
def speakers_page():
    return render_template('contact.html')

@app.route('/practical')
def practical_info():
    return render_template('contact.html')
