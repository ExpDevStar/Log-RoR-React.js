class UserController < ApplicationController
	#for user not logged in
	WELCOME_PAGE = 0
	REGISTRATION_PAGE = 1
	LOGIN_PAGE = 2
	#for user logged in
	HOME_PAGE = 0
	SEARCH_PAGE = 1
	#login and register states
	LOGIN_ERROR = -1
	NO_LOGIN_ERROR = 1

  def create
  	user = User.new(user_params(params))
  	if user.save
		session[:user] = user.id
		render :json => {
			:user => user.to_json,
			:login_state => NO_LOGIN_ERROR,
			:page => WELCOME_PAGE,
			:runs => []
		}
  	else
  		render :json => {:login_state => LOGIN_ERROR}
  	end
  end

  def index
  	if session.has_key?(:user)
  		user = User.find(session[:user])
  	else
  		user = nil
  	end
  	@data = {
  		:runs => Run.find_all_by_user_id(session[:user], :order => 'date DESC'),
  		:form => {
  			:csrf_param => request_forgery_protection_token,
  			:csrf_token => form_authenticity_token
	  		},
		:page => HOME_PAGE,
		:user => user,
		:login_state => true
	}
  end

	def login
		user = User.find_by_login(params[:login])
		if user.nil?
			render :json => {
				:login_state => LOGIN_ERROR,
				:page => LOGIN_PAGE
			}
		else
			session[:user] = user.id
			render :json => {
				:login_state => NO_LOGIN_ERROR,
				:runs => Run.find_all_by_user_id(user.id),
				:page => HOME_PAGE,
				:user => user.to_json,
			}
		end
	end

	def logout
		reset_session
		render :json => {
	  		:form => {
	  			:csrf_param => request_forgery_protection_token,
	  			:csrf_token => form_authenticity_token
	  		},
			:user => nil,
			:login_state => NO_LOGIN_ERROR,
			:page => WELCOME_PAGE
		}
	end

	private
	def user_params(params)
		return params.permit(:first_name, :last_name, :login)
	end
end
