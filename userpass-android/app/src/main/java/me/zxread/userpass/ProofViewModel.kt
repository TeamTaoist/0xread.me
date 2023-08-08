package me.zxread.userpass

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel

class ProofViewModel : ViewModel() {
    val proofs = arrayOfNulls<String>(4)
    private val proofsLiveData = MutableLiveData<Array<String?>>()

    val allProofs: LiveData<Array<String?>> get() = proofsLiveData

    fun setProof(id: Int, proof: String) {
        proofs[id] = proof
        proofsLiveData.postValue(proofs)
    }
}