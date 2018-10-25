class TodosController < ApplicationController
    def index
      @todos = Todo.all


      
    end
  
    def create
        # binding.pry
      Todo.create(todo_params)

      @test = 5
      respond_to do |format|
        # if the response fomat is html, redirect as usual
        format.html { 
            p "hey"
        redirect_to root_path }
    
        # if the response format is javascript, do something else...
        format.js { p "ijfnr"
    
      }
      end
    end
  
    def destroy
       
      todo = Todo.find(params[:id])
      todo.destroy
      redirect_to root_path
    end
  
    private
      def todo_params
        params.require(:todo).permit(:description, :priority)
      end
  end
