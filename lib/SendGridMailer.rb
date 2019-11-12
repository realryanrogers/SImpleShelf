
require 'sendgrid-ruby'
include SendGrid

class SendGridMailer
    def self.send(user, template_id)
        from = Email.new(email: 'simplebot@simpleshelf.io')
        to = Email.new(email: user.email)
        mail = SendGrid::Mail.new(from, subject, to, content)
        mail.template_id = template_id

        personalization = Personalization.new
        personalization.substitutions = Substitution.new(
            key: '-varFirstname-', value: 'Replacement for percent sign templatevar'
        )

         
        sg = SendGrid::API.new(api_key: ENV['SENDGRID_API_KEY'])
        begin
            response = sg.client.mail._("send").post(request_body: data)
            puts "----"
            puts data
            puts "----"
            puts response
            return response.status_code
        rescue Exception => e
            puts e.message
        end
    end
end