require 'spec_helper'

describe "a user can interact with a todo" do

	it "lets user create a todo", js: true do
		
		visit root_path
		fill_in "New To-Do:", with: "do your grammar homework"

		click_button "Submit"

		expect(page).to have_content("do your grammar homework")

	end

	# it "lets user delete a todo" do



	# end


end