import os
import dotenv
from behave import *
from nose.tools import assert_equal
from pages.syslaudo_pages import Syslaudo

dotenv.load_dotenv(dotenv.find_dotenv())
syslaudopage = Syslaudo(os.getenv('USER_EMAIL'),
                        os.getenv('USER_PASS'))

@given(u'que acesso a plataforma do syslaudo')
def step_impl(context):
    syslaudopage.open_page('https://syslaudo-frontend.herokuapp.com')

@given(u'que preencho o campo de Email')
def step_impl(context):
    syslaudopage.input_email()
    

@given(u'preencho a Senha')
def step_impl(context):
    syslaudopage.input_password()


@when(u'clico no botão de login')
def step_impl(context):
    syslaudopage.login()


@then(u'devo acessar a plataforma')
def step_impl(context):
    assert_equal(syslaudopage.get_register_title(), 'CADASTRO')