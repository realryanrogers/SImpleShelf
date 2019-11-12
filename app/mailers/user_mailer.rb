
class UserMailer < ApplicationMailer



    def reset_password(user)
        @user = user
        SendGridMailer.send(@user.email, {varFirstname: @user.firstname, varResetlink: @user.reset_password_token}, "d-1cffdcf5eab245ef9a008f50ff7186ce")

    end
end