package com.example.artcoin.core;

import com.example.artcoin.blockchain.ArtChain;
import com.example.artcoin.utils.StringUtil;

import java.security.PrivateKey;
import java.security.PublicKey;
import java.util.ArrayList;

public class Transaction {

    public String transactionId;
    public String artId;
    public PublicKey sender;
    public PublicKey reciepient;
    public float value;
    public byte[] signature;

    public ArrayList<TransactionInput> inputs = new ArrayList<TransactionInput>();
    public ArrayList<TransactionOutput> outputs = new ArrayList<TransactionOutput>();

    private static int sequence = 0;

    public Transaction() {
    }

    // Constructor:
    public Transaction(PublicKey from, PublicKey to, float value,  ArrayList<TransactionInput> inputs, String artId) {
        this.sender = from;
        this.reciepient = to;
        this.value = value;
        this.inputs = inputs;
        this.artId = artId;
    }

    // 트랜잭션 수행
    public boolean processTransaction() {

        if(verifySignature() == false) {
            System.out.println("#Transaction Signature failed to verify");
            return false;
        }

        if (inputs == null) return true;

        for(TransactionInput i : inputs) {
            i.UTXO = ArtChain.UTXOs.get(i.transactionOutputId);
        }

        // 트랜잭션 최소값 확인
        if(getInputsValue() < ArtChain.minimumTransaction) {
            System.out.println("Transaction Inputs too small: " + getInputsValue());
            System.out.println("Please enter the amount greater than " + ArtChain.minimumTransaction);
            return false;
        }

        // 트랜잭션 output 생성
        float leftOver = getInputsValue() - value;
        transactionId = calulateHash();
        outputs.add(new TransactionOutput( this.reciepient, value,transactionId, artId)); // 전송
        outputs.add(new TransactionOutput( this.sender, leftOver,transactionId, artId)); // 전송 후 남은 값

        // output 값 UTXOs 에 추가
        for(TransactionOutput o : outputs) {
            ArtChain.UTXOs.put(o.id , o);
        }

        // 사용된 input 삭제
        for(TransactionInput i : inputs) {
            if(i.UTXO == null) continue;
            ArtChain.UTXOs.remove(i.UTXO.id);
        }

        return true;
    }

    // input 값 조회
    public float getInputsValue() {
        float total = 0;
        for(TransactionInput i : inputs) {
            if(i.UTXO == null) continue;
            total += i.UTXO.value;
        }
        return total;
    }

    // 서명 생성
    public void generateSignature(PrivateKey privateKey) {
        String data = StringUtil.getStringFromKey(sender) + StringUtil.getStringFromKey(reciepient) + Float.toString(value)	;
        signature = StringUtil.applyECDSASig(privateKey,data);
    }

    // 서명 검사
    public boolean verifySignature() {
        String data = StringUtil.getStringFromKey(sender) + StringUtil.getStringFromKey(reciepient) + Float.toString(value)	;
        return StringUtil.verifyECDSASig(sender, data, signature);
    }

    // output 값 조회
    public float getOutputsValue() {
        float total = 0;
        for(TransactionOutput o : outputs) {
            total += o.value;
        }
        return total;
    }

    // 해시 계산
    private String calulateHash() {
        sequence++;
        return StringUtil.applySha256(
                StringUtil.getStringFromKey(sender) +
                        StringUtil.getStringFromKey(reciepient) +
                        Float.toString(value) + sequence
        );
    }
}