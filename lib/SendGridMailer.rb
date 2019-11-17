
require 'sendgrid-ruby'
include SendGrid
require 'json'

class SendGridMailer
    def self.send(user, template_id)

        reset_token = 'https://www.simpleshelf.io/resetpassword/' + user.reset_password_token

        mail = SendGrid::Mail.new
        mail.from = SendGrid::Email.new(email: 'simplebot@simpleshelf.io')
        mail.subject = 'SimpleShelf: Password Reset'
        #mail.add_content(SendGrid::Content.new(type: 'text/plain', value: 'some text here'))
        pers = SendGrid::Personalization.new
        pers.add_to(SendGrid::Email.new(email: user.email))
        # pers.add_substitution(SendGrid::Substitution.new(key: '%varFirstName', value: (user.firstname ? user.firstname : "")))
        # pers.add_substitution(SendGrid::Substitution.new(key: '%varResetlink%', value: user.reset_password_token))
        pers.add_dynamic_template_data({
            "varFirstname" => user.firstname ? user.firstname : "",
            "varResetlink" => reset_token
        })
        mail.add_personalization(pers)
        mail.template_id = 'd-1cffdcf5eab245ef9a008f50ff7186ce'
        # from = SendGrid::Email.new(email: 'ryan@simpleshelf.io')
        # subject = 'Hello from SimpleShelf!'
        # to = SendGrid::Email.new(email: 'ryansrogers85@gmail.com')
        # content = SendGrid::Content.new(type: 'text/plain', value: 'This is a test automated email! Thanks for being a test subject!')
        # mail = SendGrid::Mail.new(from, subject, to, content)
        
        
        sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
        begin
            response = sg.client.mail._("send").post(request_body: mail.to_json)
            puts "----"
            puts mail.to_json
            puts "----"
            puts response
            return response.status_code
        rescue Exception => e
            puts e.message
        end
    end
end