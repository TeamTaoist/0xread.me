package me.zxread.userpass

import android.app.Activity
import android.widget.TextView
import com.fasterxml.jackson.databind.ObjectMapper
import okhttp3.Call
import okhttp3.Callback
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.Response
import org.json.JSONObject
import java.io.IOException

class ZxreadmeClient(base: String) {
    private val requestProofUrl: String = "$base/proof/issue"
    private val verifyUrl: String = "$base/proof/verify?proof="
    private val httpClient: OkHttpClient = OkHttpClient()
    private val objMapper = ObjectMapper()

    fun getProof(signMsg: String, groupId: Int, proofsViewModel: ProofViewModel, activity: Activity?, textRsltView: TextView) {
        val requestProofData = mapOf("sign_msg" to signMsg, "group_id" to groupId)
        val reqBody = JSONObject(requestProofData).toString().toRequestBody("application/json".toMediaType())
        val request = Request.Builder().url(requestProofUrl).post(reqBody).build()

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
                            val respContent = response.body?.string()
                            val respProof = objMapper.readTree(respContent).get(/* fieldName = */ "data").get("proof").asText()
                            proofsViewModel.setProof(groupId, "$verifyUrl$respProof")

                            activity?.runOnUiThread {
                                textRsltView.text = respProof
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