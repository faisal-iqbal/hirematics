class SendersController < ApplicationController
  # GET /senders
  # GET /senders.json
  def index
    @senders = Sender.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @senders }
    end
  end

  # GET /senders/1
  # GET /senders/1.json
  def show
    @sender = Sender.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @sender }
    end
  end

  # GET /senders/new
  # GET /senders/new.json
  def new
    @sender = Sender.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @sender }
    end
  end

  # GET /senders/1/edit
  def edit
    @sender = Sender.find(params[:id])
  end

  # POST /senders
  # POST /senders.json
  def create
    @sender = Sender.new(params[:sender])

    respond_to do |format|
      if @sender.save
        format.html { redirect_to @sender, :notice => 'Sender was successfully created.' }
        format.json { render :json => @sender, :status => :created, :location => @sender }
      else
        format.html { render :action => "new" }
        format.json { render :json => @sender.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /senders/1
  # PUT /senders/1.json
  def update
    @sender = Sender.find(params[:id])

    respond_to do |format|
      if @sender.update_attributes(params[:sender])
        format.html { redirect_to @sender, :notice => 'Sender was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @sender.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /senders/1
  # DELETE /senders/1.json
  def destroy
    @sender = Sender.find(params[:id])
    @sender.destroy

    respond_to do |format|
      format.html { redirect_to senders_url }
      format.json { head :ok }
    end
  end
end
