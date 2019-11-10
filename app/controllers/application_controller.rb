class ApplicationController < ActionController::API
  #skip_before_action :verify_authenticity_token

  before_action :authenticate

  rescue_from ResetPasswordError, with: :not_authorized

  def fallback_index_html
    render :file => 'public/index.html'
  end

  def logged_in?
    puts "checking current_user"
    !!current_user
  end

  def current_user
    if auth_present?
      puts "Auth present"
      puts "auth user" + auth
      user = User.find_by(public_user_id: auth)
      puts "User " + user.public_user_id
      if user
        @current_user ||= user
      end
    end
  end

  def authenticate
     if logged_in?
     else
       render json: {error: "Unauthorized"}, status: 401
     end
  end

  private

    def not_authorized
      render json: { error: 'Not authorized' }, status: :unauthorized
    end

    def token

      request.headers["HTTP-AUTHORIZATION"].scan(/Bearer(.*)$/).flatten.last.strip
    end

    def auth
      puts "TOKEN " + token
      Auth.decode(token)
    end

    def auth_present?
      !!request.headers.fetch("HTTP-AUTHORIZATION", "").scan(/Bearer/).flatten.first
    end


end
