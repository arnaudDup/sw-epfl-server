
function ConstanteJson()
{
    this.response = {
    'success' : null,
    'error'   : null,
    }

    this.urlFacebook = "https://graph.facebook.com/";
    this.filedsFacebook = 'email,cover,birthday,first_name,last_name,name,picture';

    this.InitizializeGoodAnwser  = function ()
    {
        this.response.success = 'true';
        return this.response
    }
    
    this.InitizializeBadAnwser = function (error)
    {
        this.response.success = 'false';
        this.response.error = error;
        return this.response
    }
}


// export object
module.exports = new ConstanteJson();
