from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
from browser import Browser
from model.syslaudo import SyslaudoModel

class Syslaudo(Browser):
  
    def __init__(self, user_email, user_password):
        self.__user_email = user_email
        self.__user_password = user_password
        self.__syslaudo_model = SyslaudoModel()

    def get_element(self, locator):
        WebDriverWait(self.driver, 10).until(ec.visibility_of_element_located((By.XPATH, locator)))
        return self.driver.find_element(By.XPATH, locator) 
    
    def open_page(self, url):
      self.driver.get(url)
      
    def input_email(self):
        input_email = self.get_element(self.__syslaudo_model.getInputEmail)
        input_email.send_keys(self.__user_email)
        
    def input_password(self):
        input_password = self.get_element(self.__syslaudo_model.getInputPassword)
        input_password.send_keys(self.__user_password)
    
    def login(self):
        login = self.get_element(self.__syslaudo_model.getLoginButton)
        login.click()
        
    def get_register_title(self):
        element = self.get_element(self.__syslaudo_model.getRegisterTitle)
        return element.text