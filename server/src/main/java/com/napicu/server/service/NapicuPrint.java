package com.napicu.server.service;

import java.text.SimpleDateFormat;
import java.util.Date;

public class NapicuPrint {

    protected String time;

    public NapicuPrint() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        this.time = formatter.format(date);
    }

    public void printError(String errorTitle, String err) {
        System.out.println();
        System.err.println("[NAPICUAPI] " + time + " ERROR  ---  " + errorTitle + " : " + err);
    }

    public void printInfo(String msg) {
        System.out.println();
        System.err.println("[NAPICUAPI]  INFO  " + msg);
    }
}
