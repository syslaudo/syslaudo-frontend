class SyslaudoModel:
  
    def __init__(self):
      self.__INPUT_EMAIL = '//*[@id="email"]'
      self.__INPUT_PASSWORD = '//*[@id="password"]'
      self.__LOGIN_BUTTON= '/html/body/div/div[2]/div/form/div[3]/button'
      self.__REGISTER_TITLE= '/html/body/div/div[2]/div/h1[1]'
      self.__USER_PATH = '/html/body/div/div[1]/header/div/ul[1]/li[5]/a'
      self.__REGISTER_USER = '/html/body/div[1]/div[2]/div/div[1]/button'
      self.__USER_NAME = '//*[@id="name"]'
      self.__USER_CPF = '//*[@id="cpf"]'
      self.__USER_EMAIL = '//*[@id="email"]'
      self.__USER_TYPE = '/html/body/div[3]/div/div/form/div[4]/div/label[1]/span'
      self.__REGISTER_BUTTON = '/html/body/div[3]/div/div/form/div[8]/button[1]'
    
    @property
    def getInputEmail(self):
      return self.__INPUT_EMAIL
    
    @property
    def getInputPassword(self):
      return self.__INPUT_PASSWORD

    @property
    def getLoginButton(self):
      return self.__LOGIN_BUTTON

    @property
    def getRegisterTitle(self):
      return self.__REGISTER_TITLE

    @property
    def getUserPath(self):
      return self.__USER_PATH

    @property
    def getResgisterUser(self):
      return self.__REGISTER_USER

    @property
    def getUserName(self):
      return self.__USER_NAME
    
    @property
    def getUserCPF(self):
      return self.__USER_CPF

    @property
    def getUserEmail(self):
      return self.__USER_EMAIL
    
    @property
    def getUserType(self):
      return self.__USER_TYPE
    
    @property
    def getRegisterButton(self):
      return self.__REGISTER_BUTTON