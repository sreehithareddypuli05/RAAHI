from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime, timezone
import uuid
app=FastAPI(title='RAAHI API',version='2.0')
app.add_middleware(CORSMiddleware,allow_origins=['http://localhost:5173','http://127.0.0.1:5173'],allow_methods=['*'],allow_headers=['*'])
journeys=[]; emergency_events=[]; messages=[]
class Item(BaseModel):
    data: dict
@app.get('/health')
def health(): return {'status':'ok','service':'RAAHI API','time':datetime.now(timezone.utc).isoformat()}
@app.post('/journeys')
def create_journey(item:Item):
    x={'id':str(uuid.uuid4()),**item.data,'created_at':datetime.now(timezone.utc).isoformat()}; journeys.append(x); return x
@app.get('/journeys')
def get_journeys(): return journeys
@app.post('/emergency/events')
def emergency(item:Item):
    x={'id':str(uuid.uuid4()),**item.data,'received_at':datetime.now(timezone.utc).isoformat()}; emergency_events.append(x); return x
@app.post('/emergency/messages')
def message(item:Item):
    x={'id':str(uuid.uuid4()),**item.data,'received_at':datetime.now(timezone.utc).isoformat()}; messages.append(x); return x
@app.post('/sync/batch')
def sync(item:Item): return {'status':'SYNCHRONIZED','received_at':datetime.now(timezone.utc).isoformat(),'items':len(item.data.get('items',[]))}
@app.get('/sync/changes')
def changes(): return {'emergency_events':emergency_events,'messages':messages}
