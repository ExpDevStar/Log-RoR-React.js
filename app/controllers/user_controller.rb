class UserController < ApplicationController
	#for user not logged in
	WELCOME_PAGE = 0
	REGISTRATION_PAGE = 1
	LOGIN_PAGE = 2
	#for user logged in
	HOME_PAGE = 0
	SEARCH_PAGE = 1

  def create
  	user = User.new(user_params(params))
  	if user.save
		session[:user] = user.id
		render :json => {
			:user => user.to_json,
			:login_first_try => 1, #valid login or register is 1
			:page => WELCOME_PAGE,
			:runs => []
		}
  	else
  		render :json => {:login_first_try => -1}#invalid login or register is -1
  	end
  end

  def index
  	if session.has_key?(:user)
  		user = User.find(session[:user])
  	else
  		user = nil
  	end
  	@data = {
  		:runs => Run.find_all_by_user_id(session[:user]),
  		:form => {
  			:csrf_param => request_forgery_protection_token,
  			:csrf_token => form_authenticity_token
	  		},
		:page => HOME_PAGE,
		:user => user,
		:login_first_try => true
	}
  end

	def login
		user = User.find_by_login(params[:login])
		if user.nil?
			render :json => {
				:login_first_try => -1,
				:page => LOGIN_PAGE
			}
		else
			session[:user] = user.id
			render :json => {
				:login_first_try => 1,
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
			:login_first_try => 1,
			:page => WELCOME_PAGE
		}
	end

	private
	def user_params(params)
		return params.permit(:first_name, :last_name, :login)
	end
end
