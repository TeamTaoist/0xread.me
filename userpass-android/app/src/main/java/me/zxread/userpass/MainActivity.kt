package me.zxread.userpass

import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import me.zxread.userpass.databinding.ActivityMainBinding


class MainActivity : AppCompatActivity() {

    private lateinit var appBarConfiguration: AppBarConfiguration
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.toolbar)

        val navController = findNavController(R.id.nav_host_fragment_content_main)
        appBarConfiguration = AppBarConfiguration(navController.graph)
        setupActionBarWithNavController(navController, appBarConfiguration)

        var fabVisable = false

        binding.fab.setOnClickListener {
            if (!fabVisable) {
                binding.fabGenProof.show()
                binding.fabShowProof.show()

                binding.fabGenProof.visibility = View.VISIBLE
                binding.fabShowProof.visibility = View.VISIBLE

                fabVisable = true
            } else {
                binding.fabGenProof.hide()
                binding.fabShowProof.hide()

                binding.fabGenProof.visibility = View.GONE
                binding.fabShowProof.visibility = View.GONE

                fabVisable = false
            }
        }

        binding.fabGenProof.setOnClickListener {
            findNavController(R.id.nav_host_fragment_content_main).navigate(R.id.NewProofFragment)
        }

        binding.fabShowProof.setOnClickListener {
            findNavController(R.id.nav_host_fragment_content_main).navigate(R.id.ShowProofFragment)
        }
    }

    override fun onSupportNavigateUp(): Boolean {
        val navController = findNavController(R.id.nav_host_fragment_content_main)
        return navController.navigateUp(appBarConfiguration)
                || super.onSupportNavigateUp()
    }


}

