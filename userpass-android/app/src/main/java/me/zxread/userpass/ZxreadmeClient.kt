package me.zxread.userpass

import android.app.Activity
import android.util.Log
import android.widget.TextView
import okhttp3.Call
import okhttp3.Callback
import okhttp3.HttpUrl.Companion.toHttpUrl
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import java.io.IOException


class ZxreadmeClient(base: String) {
    private val identityApi: String = "$base/issue"
    private val joinGroupApi: String = "$base/join"
    private val httpClient: OkHttpClient = OkHttpClient()

    fun getIdentity(signMsg: String, activity: Activity?, textRsltView: TextView) {
        val url =
            identityApi.toHttpUrl().newBuilder().addQueryParameter("sign_msg", signMsg).build()
        val request = Request.Builder().url(url).build()
        Log.e("me.zxread.userpass", "request: $request")

        try {
            httpClient.newCall(request).enqueue(object : Callback {
                override fun onFailure(call: Call, e: IOException) {
                    activity?.runOnUiThread { textRsltView.text = e.message }
                }

                override fun onResponse(call: Call, response: Response) {
                    response.use {
                        if (!response.isSuccessful) {
                            activity?.runOnUiThread {
                                textRsltView.text = response.toString()
                            }
                        } else {
                            activity?.runOnUiThread {
                                textRsltView.text = response.body!!.string()
                            }
                        }
                    }
                }
            })
        } catch (e: IllegalStateException) {
            activity?.runOnUiThread { textRsltView.text = e.message }
        }
    }
}