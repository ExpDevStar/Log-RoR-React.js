class CreateRuns < ActiveRecord::Migration
  def change
    create_table :runs do |t|
      t.integer		:user_id
      t.string		:name
      t.date			:date
      t.time			:start_time
      t.time			:end_time
      t.text			:notes
      t.float			:distance
    end
  end
end
