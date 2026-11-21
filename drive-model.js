/* Drive data adapter. Pure normalization; never changes the source metadata. */
(function(root,factory){const model=factory();if(typeof module==='object'&&module.exports)module.exports=model;else root.LibraryDriveModel=model;})(typeof window==='undefined'?globalThis:window,function(){
  'use strict';
  const FILE_TYPES=new Set(['application/pdf','application/epub+zip','application/vnd.google-apps.document','application/vnd.openxmlformats-officedocument.wordprocessingml.document','text/plain']);
  const validId=value=>typeof value==='string'&&/^[a-zA-Z0-9_-]+$/.test(value);
  function folderId(value){const text=String(value||'').trim();if(!text)return '';if(validId(text))return text;try{const url=new URL(text);if(url.protocol!=='https:'||!['drive.google.com','docs.google.com'].includes(url.hostname))return '';return url.pathname.match(/\/folders\/([\w-]+)/)?.[1]||'';}catch{return '';}}
  const systemFile=name=>/^(password|library_metadata(?:_backup_.*)?\.json$)/i.test(String(name||''));
  function supported(file){return !!file&&validId(file.id)&&!file.trashed&&!systemFile(file.name)&&!/^Writing - /i.test(file.name||'')&&FILE_TYPES.has(file.mimeType);}
  function metadataObject(value){return value&&typeof value==='object'&&!Array.isArray(value)?value:{};}
  function storageLocations(metadata){const value=metadataObject(metadata).__library?.storageLocations;return Array.isArray(value)?value.filter(l=>l&&l.enabled!==false&&validId(l.folderId)).map(l=>({id:l.folderId,name:String(l.storageName||l.name||'Additional library')})):[];}
  function positive(value){const n=Number(value);return Number.isFinite(n)&&n>0?Math.floor(n):null;}
  function normalize(file,metadata={},storageName='My Library'){
    let uploaded={};if(file.properties?.myofficeBook==='v1'){try{const d=JSON.parse(file.description||'{}');if(d.v===1)uploaded={title:typeof d.title==='string'?d.title:'',author:typeof d.author==='string'?d.author:'',collection:typeof d.category==='string'?d.category:'',tags:typeof d.category==='string'?[d.category]:[]};}catch{}}const raw={...uploaded,...metadataObject(metadataObject(metadata)[file.id])};const tags=Array.isArray(raw.tags)?raw.tags.filter(t=>typeof t==='string').map(t=>t.trim()).filter(Boolean):[];
    const name=String(file.name||'Untitled').replace(/\.(pdf|epub|docx|txt)$/i,'');const title=typeof raw.title==='string'&&raw.title.trim()?raw.title.trim():name;
    const ext=file.mimeType==='application/vnd.google-apps.document'?'Google Doc':file.mimeType==='application/pdf'?'PDF':file.mimeType==='application/epub+zip'?'EPUB':file.mimeType==='text/plain'?'Text':'Word';
    const hash=[...file.id].reduce((n,c)=>n+c.charCodeAt(0),0);const palette=['#285969,#142e43','#6e4c75,#332342','#876b3e,#423622','#566850,#293b35','#4d678b,#25314f'];
    return {id:file.id,title,author:typeof raw.author==='string'?raw.author:'',category:typeof raw.collection==='string'&&raw.collection.trim()?raw.collection.trim():tags[0]||'Uncategorized',collection:typeof raw.collection==='string'?raw.collection:'',year:typeof raw.year==='string'||typeof raw.year==='number'?String(raw.year):'',pages:positive(raw.pageCount||raw.totalPages),page:positive(raw.lastPage||raw.currentPage)||0,color:palette[hash%palette.length],tags,pinned:raw.favorite===true,rtl:/[\u0600-\u06ff]/u.test(title),live:true,mimeType:file.mimeType,format:ext,size:Number(file.size)||null,storageName,lastOpened:raw.lastOpened||raw.lastOpenedAt||null,modifiedTime:file.modifiedTime||'',resourceKey:typeof file.resourceKey==='string'?file.resourceKey:'',canDownload:file.capabilities?.canDownload!==false,url:driveUrl(file.id,file.mimeType)};
  }
  function driveUrl(id,mime){if(!validId(id))throw new Error('Invalid Drive file identifier.');return mime==='application/vnd.google-apps.document'?`https://docs.google.com/document/d/${id}/edit`:`https://drive.google.com/file/d/${id}/view`;}
  return {folderId,systemFile,supported,storageLocations,normalize,validId,metadataObject,driveUrl};
});
