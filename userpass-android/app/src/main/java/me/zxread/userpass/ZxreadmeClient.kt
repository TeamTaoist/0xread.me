package me.zxread.userpass

import android.app.Activity
import android.graphics.Color
import android.widget.ImageView
import android.widget.Toast
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

    fun getProof(signMsg: String, groupId: Int, proofsViewModel: ProofViewModel, activity: Activity?, statusView: ImageView) {
        val requestProofData = mapOf("sign_msg" to signMsg, "group_id" to groupId)
        val reqBody = JSONObject(requestProofData).toString().toRequestBody("application/json".toMediaType())
        val request = Request.Builder().url(requestProofUrl).post(reqBody).build()

        statusView.setColorFilter(Color.YELLOW)

        try {
            httpClient.newCall(request).enqueue(object : Callback {
                override fun onFailure(call: Call, e: IOException) {
                    activity?.runOnUiThread {
                        Toast.makeText(activity, "request failed: ${e.message}", Toast.LENGTH_LONG).show()
                    }
                }

                override fun onResponse(call: Call, response: Response) {
                    response.use {
                        if (!response.isSuccessful) {
                            activity?.runOnUiThread {
                                Toast.makeText(activity, "unexpected response: $response", Toast.LENGTH_LONG).show()
                            }
                        } else {
                            val respContent = response.body?.string()
                            val respProof = objMapper.readTree(respContent).get(/* fieldName = */ "data").get("proof").asText()
                            proofsViewModel.setProof(groupId, "$verifyUrl$respProof")

                            activity?.runOnUiThread {
                                Toast.makeText(activity, "request completed", Toast.LENGTH_LONG).show()
                                statusView.setColorFilter(Color.GREEN)
                            }
                        }
                    }
                }
            })
        } catch (e: IllegalStateException) {
            activity?.runOnUiThread { Toast.makeText(activity, "exception: ${e.message}", Toast.LENGTH_LONG).show() }
        }
    }
}